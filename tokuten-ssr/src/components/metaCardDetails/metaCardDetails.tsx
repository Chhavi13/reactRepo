import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './metaCardDetails.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardRoot: {
      maxWidth: 365,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    }
  }),
);

export const MetaDataCardDetails = ({image, title, description, url}: any) => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className="paper-card-post">
      <Card className={classes.cardRoot} onClick={() => window.open(url)}>
        <CardMedia className={classes.media} image={image} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h1">{title}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
        </CardContent>
      </Card>
    </Paper>
  )
}