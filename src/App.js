/* eslint-disable require-jsdoc */
import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import SearchBar from 'material-ui-search-bar';
import debounce from 'lodash.debounce';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.3)',
    backgroundColor: '#fafafa',
  },
  media: {
    height: 300,
  },
});

function App() {
  const [data, setData] = useState([]);
  const [searchTerm] = useState([]);


  const debounceOnChange = React.useCallback(debounce(onChange, 1000), []);

  function onChange(value) {
    axios.get(`https://finalspaceapi.com/api/v0/character/${value}`)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          setData(data);
        });
  };

  const classes = useStyles();

  return (
    <div>
      <Container>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h2"
          align="center"
        >
          React Material UI Example{' '}
        </Typography>
        <Container>
          <SearchBar
            value={searchTerm}
            onChange={(e) => debounceOnChange(e)}
            style={{

              maxWidth: 800,
              marginBottom: '10px',
            }}
          />
        </Container>
        <Grid container spacing={3}>
          {
            <Grid item xs={12} sm={4} key={data.id}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={data.img_url}
                />
                <CardContent>
                  <Typography color="primary" variant="h5">
                    {data.name}
                  </Typography>
                  <Typography color="textSecondary" variant="subtitle2">
                    {data.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            //   data.map((character) => (
            //     <Grid item xs={12} sm={4} key={character.id}>
            //       <Card className={classes.card}>
            //         <CardMedia
            //           className={classes.media}
            //           image={character.img_url}
            //         />
            //         <CardContent>
            //           <Typography color="primary" variant="h5">
            //             {character.name}
            //           </Typography>
            //           <Typography color="textSecondary" variant="subtitle2">
            //             {character.status}
            //           </Typography>
            //         </CardContent>
            //       </Card>
            //     </Grid>
            //   ))
          }
        </Grid>
      </Container>
    </div>
  );
}

export default App;
