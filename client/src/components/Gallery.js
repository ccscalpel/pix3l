import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import noImage from '../img/na.jpeg';
import Modal from "./Modal";
import Generate from './Generate';
import {Navigate} from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles, Button, LinearProgress, CircularProgress } from '@material-ui/core';

import {AuthContext} from '../firebase/Auth';

const useStyles = makeStyles({
    card: {
        zIndex: 1,
        maxWidth: 250,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        border: '1px solid #1e8678',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
    },
    titleHead: {
        borderBottom: '1px solid #1e8678',
        fontSize: 15
    },
    grid: {
        flexGrow: 1,
        flexDirection: 'row'
    },
    media: {
        height: '100%',
        width: '100%'
    },
    button: {
        color: '#1e8678',
        fontWeight: 'bold',
        fontSize: 12
    }

});



function Gallery() {
    const classes = useStyles();
    const [ loading, setLoading] = useState(true);
    const [ generateData, setGenerateData] = useState(null);
    const [ pokeData, setpokeData] = useState(undefined);
    const [ generateTerm, setGenerateTerm] = useState('');
    const [ needGenerate, setNeedGenerate] = useState(false);
    const [ style, setStyle] = useState('');
    const [ next, setNext ] = useState(true);
    const [ previous, setPrevious ] = useState(true);
    const [ outOfPage, setOutOfPage ] = useState(false);
    const [ badRequest, setBadRequest ] = useState(false);
    const [ generated, setGenerated] = useState(false);
    const [ genError, setGenError] = useState(false);
    const [ added1, setAdded1] = useState(false);
    const [ added2, setAdded2] = useState(false);
    const [ added3, setAdded3] = useState(false);
    const [ added4, setAdded4] = useState(false);
    const [ lastPage, setLastPage] = useState(1);
    const { pagenum } = useParams();

    const firstPage = 1;
    //const lastPage = 6;

    let card = null;

    const {currentUser} = useContext(AuthContext);


    const [modalOpen, setModalOpen] = useState(false);
    const [p, setP] = useState(undefined);

    useEffect(() => {

        async function fetchData() {

            try {
                if (currentUser) {
                    //console.log(currentUser.uid);
                    await axios.post('//www.pix3l.art/api/newUser/' + currentUser.uid);
                }
                const { data } = await axios.get('//www.pix3l.art/api/gallery');

                setLastPage(Math.ceil(data.length/48))


                //console.log(data)
                const tmp = data.slice( (Number(pagenum)-1)*48, Number(pagenum)*48);

                //console.log(tmp)
                setpokeData(tmp);

                setLoading(false);
                setOutOfPage(false);
                setBadRequest(false);
                if (Number(pagenum) === firstPage){
                    
                    setPrevious(false);
					setNext(true);
                } else if (Number(pagenum) === lastPage){
                    setPrevious(true);
					setNext(false);
                } else if (Number(pagenum) > lastPage){
                    setOutOfPage(true);
                } else if (Number(pagenum) < firstPage){
                    setBadRequest(true);
                } else {
                    setPrevious(true);
					setNext(true);
                }
            } catch (e) {
                setLoading(false);
                console.log(e);
            }
        }


        fetchData();

    }, [pagenum]);

    useEffect(() => {


        async function fetchData() {
            try {

              
                if (generateTerm && style){
                    const url = "http://www.pix3l.art/api/generate?style=" + style + "&text=" + generateTerm;
                    const {data} = await axios.get(url);
                    console.log(data);
                    if(!data.error){

                        setGenerateData(data);
                        setGenerated(true);
                    }
                    else if(data.error === "Time out"){
                        setGenError(true)
                    }
                  
                }

            } catch (e) {

                console.log(e);
            }
        }
        if (generateTerm) {
            //console.log('generateTerm is set');
            fetchData();
        }
    }, [generateTerm, style, needGenerate]); // eslint-disable-line react-hooks/exhaustive-deps


    const generateValue = async (value) => {
        setGenerateTerm(value.text);
        setStyle(value.style);
        setGenerated(false);
        if (needGenerate) {
            setNeedGenerate(false);
        } else {
            setNeedGenerate(true);
        }
    };

    const addImg1 = async (e) => {
        e.preventDefault();
        try {
            await axios({
                method: 'post',
                url: '//www.pix3l.art/api/addImage',
                data:  {
                    userId: currentUser.uid, 
                    imageId: generateData[0].id, 
                    style: style, 
                    text: generateTerm
                }
              });
              setAdded1(true);
        } catch (err) {
            console.log(err);
        }	
    };

    const addImg2 = async (e) => {
        e.preventDefault();
        try {
            await axios({
                method: 'post',
                url: '//www.pix3l.art/api/addImage',
                data:  {
                    userId: currentUser.uid, 
                    imageId: generateData[1].id, 
                    style: style, 
                    text: generateTerm
                }
              });
            setAdded2(true);
        } catch (err) {
            console.log(err);
        }	
    };

    const addImg3 = async (e) => {
        e.preventDefault();
        try {
            await axios({
                method: 'post',
                url: '//www.pix3l.art/api/addImage',
                data:  {
                    userId: currentUser.uid, 
                    imageId: generateData[2].id, 
                    style: style, 
                    text: generateTerm
                }
              });
              setAdded3(true);
        } catch (err) {
            console.log(err);
        }	
    };
    
    const addImg4 = async (e) => {
        e.preventDefault();
        try {
            await axios({
                method: 'post',
                url: '//www.pix3l.art/api/addImage',
                data:  {
                    userId: currentUser.uid, 
                    imageId: generateData[3].id, 
                    style: style, 
                    text: generateTerm
                }
              });
              setAdded4(true);
        } catch (err) {
            console.log(err);
        }	
    };


    const buildCard = img => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={img.id}>
                <Card className={classes.card} variant='outlined' >
                    <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                component='img'
                                image={img.url ? img.url : noImage}
                                title='user published image'
                            />

                            <CardContent>
                                <Typography
                                    className={classes.titleHead}
                                    gutterBottom
                                    variant='h6'
                                    component='h2'
                                    color='textSecondary'
                                >

                                    {img.text}
                                    <br></br>
                                    <img
                                    alt='likes'
                                    src='/imgs/like.png'
                                />
                                    {img.likes.length}
                                </Typography>
                            </CardContent>
                   
                    </CardActionArea>

                    <Button className='openModalBtn'
                        onClick={() => { setModalOpen(true); setP(img) }}> Show detail
                    </Button>

                </Card>
            </Grid>
        );
    };


    card =
    pokeData &&
    pokeData.map(img => {
        return buildCard(img);
    });
    
    if (pagenum === undefined){
        return <Navigate to='/gallery/1' />;
    }

    if (loading) {

		return (
			<div>
				<CircularProgress />
			</div>
		);
	} else {

        if (outOfPage) {
			return (
				<div>
					<h2>You reach the end!</h2>
				</div>
			);
		} else if (badRequest) {
			return (
				<div>
					<h2>Something wrong happend! Please Reload!</h2>
				</div>
			);
		} else {
            if (!generateTerm) {
                return (
                    <div>
                        <Generate generateValue={generateValue} />
                        <br />
                        <br></br>
    
                        {previous  && <Link className="showlink" to={`/gallery/${Number(pagenum) - 1}`}> {'Previous'} </Link>}
                        {" "} 
                        {<Link className="showlink" to={`/gallery/${Number(pagenum)}`}> Current Page: {pagenum}</Link>}
                        {" "}
                        {next  && <Link className="showlink" to={`/gallery/${Number(pagenum) + 1}`}> {'Next'} </Link>}
        
                        <br />
                        <br></br>
                        <br />
                        {modalOpen && <Modal props={[setModalOpen, p]} />}
                        <Grid container className={classes.grid} spacing={5}>
                            {card}
                        </Grid>
                        <br></br>
                        <br></br>
                        <br></br>
                        {previous  && <Link className="showlink" to={`/gallery/${Number(pagenum) - 1}`}> {'Previous'} </Link>}
                        {" "} 
                        {<Link className="showlink" to={`/gallery/${Number(pagenum)}`}> Current Page: {pagenum}</Link>}
                        {" "}
                        {next  && <Link className="showlink" to={`/gallery/${Number(pagenum) + 1}`}> {'Next'} </Link>}
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                );

            } else {
                if(genError){
                    return <h2>Something is wrong ...Try again.</h2>
                }
                return (
                    <div>
                        {!generated  && <h2>Generating ...</h2>}
                        {!generated  && <LinearProgress />}
                        {generated && <h2>Generated !!!</h2>}
                        <br />
                        <br />
                        <br />

                        {generated  && 
                        <Grid container spacing={3} >
                            <Card className={classes.card} variant='outlined' >
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        component='img'
                                        image={generateData[0].url}
                                        title='AI image'
                                    />
            
                                </CardActionArea>
                                {!added1 && <Button variant="contained" onClick={addImg1}>Add</Button>}
                                {added1 && <Button variant="contained" >Added</Button>}
                            </Card>
                            <Card className={classes.card} variant='outlined' >
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        component='img'
                                        image={generateData[1].url}
                                        title='AI image'
                                    />
            
                                </CardActionArea>
                                {!added2 && <Button variant="contained" onClick={addImg2}>Add</Button>}
                                {added2 && <Button variant="contained" >Added</Button>}
                            </Card>
                            
                            <Card className={classes.card} variant='outlined' >
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        component='img'
                                        image={generateData[2].url}
                                        title='AI image'
                                    />
            
                                </CardActionArea>
                                {!added3 && <Button variant="contained" onClick={addImg3}>Add</Button>}
                                {added3 && <Button variant="contained" >Added</Button>}
                            </Card>
                            <Card className={classes.card} variant='outlined' >
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        component='img'
                                        image={generateData[3].url}
                                        title='AI image'
                                    />
            
                                </CardActionArea>
                                {!added4 && <Button variant="contained" onClick={addImg4}>Add</Button>}
                                {added4 && <Button variant="contained" >Added</Button>}
                            </Card>
                        </Grid>
                        }
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <Generate generateValue={generateValue} />
                        <br />
                        <br />
                        <br />

    
                        {previous  && <Link className="showlink" to={`/gallery/${Number(pagenum) - 1}`}> {'Previous'} </Link>}
                        {" "} 
                        {<Link className="showlink" to={`/gallery/${Number(pagenum)}`}> Current Page: {pagenum}</Link>}
                        {" "}
                        {next  && <Link className="showlink" to={`/gallery/${Number(pagenum) + 1}`}> {'Next'} </Link>}
        
                        <br />
                        <br />
                        {modalOpen && <Modal props={[setModalOpen, p]} />}
                        <Grid container className={classes.grid} spacing={5}>
                            {card}
                        </Grid>
                        <br></br>
                        <br></br>
                        <br></br>
                        {previous  && <Link className="showlink" to={`/gallery/${Number(pagenum) - 1}`}> {'Previous'} </Link>}
                        {" "} 
                        {<Link className="showlink" to={`/gallery/${Number(pagenum)}`}> Current Page: {pagenum}</Link>}
                        {" "}
                        {next  && <Link className="showlink" to={`/gallery/${Number(pagenum) + 1}`}> {'Next'} </Link>}
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                );
            }
            
        }
    }
}

export default Gallery;