import React, {useContext} from 'react';
import { Button , TextField} from '@material-ui/core';
import {Navigate} from 'react-router-dom';
import {useState} from 'react';
import {AuthContext} from '../firebase/Auth';

const Generate = (props) => {

    const [formData, setFormData] = useState(null);
	const [style, setStyle] = useState('noStyle');

	const {currentUser} = useContext(AuthContext);

	

    const saveChange = (e) => {
        //console.log(e.target.value);
        setFormData(e.target.value);
    };
    
    const handleChange = (e) => {
		if (!currentUser) {
			alert("need to sign in first");
			return <Navigate to='/signin' />;
		} else {
			if (style === 'noStyle'){
				alert("please choose a style!");
			} else if (!formData){
				alert("Input something!");
			} else {
				props.generateValue({style:style, text:formData});
			}

		}
    };

	const styleChangeOne = (e) => {
		if (!currentUser) {
			alert("need to sign in first");
			return <Navigate to='/signin' />;
		} else {
			setStyle('fantasy-world-generator');
		}
    };

	const styleChangeTwo = (e) => {
		if (!currentUser) {
			alert("need to sign in first");
			return <Navigate to='/signin' />;
		} else {
			setStyle('future-architecture-generator');
		}
    };

	const styleChangeThree = (e) => {
		if (!currentUser) {
			alert("need to sign in first");
			return <Navigate to='/signin' />;
		} else {
			setStyle('stable-diffusion');
		}
    };

	const styleChangeFour = (e) => {
		if (!currentUser) {
			alert("need to sign in first");
			return <Navigate to='/signin' />;
		} else {
			setStyle('anime-world-generator');
		}
    };

    return (
		<form
			method='POST '
			onSubmit={(e) => {
				e.preventDefault();
			}}
			name='formName'
			className='center'
		>
			<label>
				<span>Enter something you want to generate: </span>
                <br/>
                <br/>
				<TextField fullWidth id="filled-basic" label="What's in your mind?" variant="filled" name='generateTerm' onChange={(e) =>saveChange(e)}/>
				{/* <input autoComplete='off' type='text' name='generateTerm' onChange={(e) =>saveChange(e)} />
                <br/> */}
                <br/>
				<br/>
				{style === 'fantasy-world-generator' && <Button variant="contained" color = 'primary' onClick={styleChangeOne} > fantasy world  </Button>} 
				{style && style !== 'fantasy-world-generator' && <Button variant="outlined" color = 'primary' onClick={styleChangeOne} > fantasy world  </Button>}
				{" "}
				{style === 'future-architecture-generator' && <Button variant="contained" color = 'primary' onClick={styleChangeTwo} >  future architecture  </Button> }
				{style && style !== 'future-architecture-generator' && <Button variant="outlined" color = 'primary' onClick={styleChangeTwo} >  future architecture  </Button> }
				{" "}
				{style === 'stable-diffusion' && <Button variant="contained" color = 'primary' onClick={styleChangeThree} > stable diffusion </Button> }
				{style && style !== 'stable-diffusion' && <Button variant="outlined" color = 'primary' onClick={styleChangeThree} >stable diffusion</Button> }
				{" "}
				{style === 'anime-world-generator' && <Button variant="contained" color = 'primary' onClick={styleChangeFour} > anime world </Button> }
				{style && style !== 'anime-world-generator' && <Button variant="outlined" color = 'primary' onClick={styleChangeFour} >anime world </Button> }
				<br/>
				<br/>
                <Button variant="contained" color = 'primary' onClick={handleChange} >Generate</Button>

			</label>
		</form>
	);
};

export default Generate;
