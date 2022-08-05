import React, { useCallback, useEffect, useState } from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import defaultStyle from './defaultStyle'
import defaultMentionStyle from './defaultMentionStyle'
import './userMentions.scss';
import { debounce, merge } from 'lodash';
import { fetchUserList } from '../../services/offer.service';

let currentValue: string;

const UserMentionsComponents = ({ placeholderText, setSingleLineValue, offerTitle, 
  setMentionsCoreValue, clearTextBox, setIsClearTextBox }: any) => {
  let style = merge({}, defaultStyle, {
    input: {
      overflow: 'auto',
      minHeight: 50,
      maxHeight: 100,
      borderRadius: '10px'
    },
    highlighter: {
      boxSizing: 'border-box',
      overflow: 'hidden',
      minHeight: 50,
      maxHeight: 100,
    },
  })

  const [value, setValue] = useState<any>('');
  const [mentionData, setMentionDataValue] = useState();

  useEffect(() => {
    if(clearTextBox) {
      setValue('');
      setIsClearTextBox(false);
    }
  }, [clearTextBox]);

  const handleChange = (event: any, newValue: any, newPlainTextValue: any, mentions: any) => {
    if (event.key === '@' || event.key === '$') currentValue = event.key;
    setValue(newValue);
    setSingleLineValue && setSingleLineValue(newPlainTextValue);
    setMentionsCoreValue && setMentionsCoreValue(newValue)
    console.log('event', newValue);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchData = useCallback(
    debounce((query, cb) => {
      fetchData(query, cb);
    }, 500),
    []
  );

  // React.useEffect(() => {
  //   debouncedFetchData(value, (filteredOptions: any) => {
  //     console.log('res', filteredOptions);
  //   });
  // }, [value, debouncedFetchData]);

  const fetchData = async (query: any, callback: any) => {
    if (!query) return;
    const res = await fetchUserList(`${currentValue}${query}`);
    console.log(res);
    callback(res);
    // fetch(`https://api.github.com/search/users?q=${singleLineValue}${query}`).then(res => res.json())
    // .then(res =>
    //   res.items.map((user: any) => ({ display: user.login, id: user.login }))
    // ).then(callback);
  }

  const onKeyPressHandler = (e: any) => {
    // console.log("all value target",e.nativeEvent.data)
    if (e.nativeEvent.data === '@' ||e.nativeEvent.data === '$' ) {
      currentValue = e.nativeEvent.data;
    }
    // if (e.key === '@' || e.key === '$') {
    // 
    //   currentValue = e.key;
    // }
  }
  
  return (
    <div>
      <MentionsInput
        id="chat-box-textarea"
        value={value}
        onInput={onKeyPressHandler}
        onChange={handleChange}
        style={style}
        placeholder={placeholderText}
        className="mentions">
        <Mention
          trigger="$"
          markup="${{__tags__||__id__||__display__}}"
          type="tags"
          renderSuggestion={(suggestion: any, search: any, highlightedDisplay: any) => (
            <div className={`user`}>{suggestion.name}</div>
          )}
          style={defaultMentionStyle}
          data={debouncedFetchData}
          className="mentions__mention"
          appendSpaceOnAdd={true}
        />
        <Mention
          trigger="@"
          markup="@{{__user__||__id__||__display__}}"
          type="user"
          renderSuggestion={(suggestion: any, search: any, highlightedDisplay: any) => (
            <div className="user">{highlightedDisplay}</div>
          )}
          style={defaultMentionStyle}
          data={debouncedFetchData}
          className="mentions__mention"
          appendSpaceOnAdd={true}
        />
      </MentionsInput>
    </div>
  );

}
export default UserMentionsComponents;