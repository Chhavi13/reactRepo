import React, { useCallback, useEffect, useState } from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import defaultStyle from './defaultStyle'
import defaultMentionStyle from './defaultMentionStyle'
import './userMentions.scss';
import { debounce, merge } from 'lodash';
import { fetchPostSearchResults, fetchUserList } from '../../services/offer.service';

let currentValue: string;

const UserMentionsComponents = ({ placeholderText, setSingleLineValue, offerTitle }: any) => {
  let style = merge({}, defaultStyle, {
    input: {
      overflow: 'auto',
      height: 100,
    },
    highlighter: {
      boxSizing: 'border-box',
      overflow: 'hidden',
      height: 100,
    },
  })

  const [value, setValue] = useState(offerTitle);
  const [mentionData, setMentionDataValue] = useState();

  useEffect(() => {
    setValue(offerTitle)
  }, [offerTitle])
  const handleChange = (event: any, newValue: any, newPlainTextValue: any, mentions: any) => {
    if (event.key === '@' || event.key === '$') currentValue = event.key;
    setValue(newValue);
    setSingleLineValue(newPlainTextValue);
    console.log('event', event);
  }

  // const fetchData = async (query: any, cb: any) => {
  // const res = (query && await fetchPostSearchResults(query)) || [];
  // cb(res);
  // };

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
    callback(res);
    // fetch(`https://api.github.com/search/users?q=${singleLineValue}${query}`).then(res => res.json())
    // .then(res =>
    //   res.items.map((user: any) => ({ display: user.login, id: user.login }))
    // ).then(callback);
  }

  const onKeyPressHandler = (e: any) => {
    
    console.log("all value target",e.nativeEvent.data)

    if (e.nativeEvent.data === '@' ||e.nativeEvent.data === '$' ) {
      
      currentValue = e.nativeEvent.data;
      

    }
    // if (e.key === '@' || e.key === '$') {
    // 
    //   currentValue = e.key;
    // }
  }
console.log(currentValue,"current values")
  return (
    <div>
      <MentionsInput
        value={value}
        // onKeyPress={onKeyPressHandler}
        // onKeypress={()=>{alert("working")}}
        onInput={onKeyPressHandler}
        onChange={handleChange}
        style={style}
        // markup="@{{__type__||__id__||__display__}}"
        placeholder={placeholderText}
        className="mentions">
        <Mention
          trigger="$"
          renderSuggestion={(suggestion: any, search: any, highlightedDisplay: any) => (
            <div className={`user`}>{suggestion.name}</div>
          )}
          style={defaultMentionStyle}
          data={debouncedFetchData}
          className="mentions__mention"
        />
        <Mention
          trigger="@"
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