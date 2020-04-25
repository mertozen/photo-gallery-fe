import React, { useState, useEffect } from 'react';
import AddGalleryContent from './AddGalleryContent';
import './GalleryContentList.css';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '%80',
        height: '%80',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

function GalleryContentList() {
    const classes = useStyles();
    const [fileList, setFileList] = useState([]);

    const addItem = (file) => {


        setFileList([file, ...fileList]);
    }

    const URL = 'http://localhost:8081/api/v1/files';

    useEffect(() => {
        fetch(URL)
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                setFileList(responseData);
            }).catch(e => console.log(e));
    }, []);


    if (!fileList.length) {
        return (<div className={classes.root}>
            <AddGalleryContent addItem={addItem} />
            <p>There is no element in gallery</p>
        </div>);
    } else {
        return (
            <div className={classes.root}>
                <AddGalleryContent addItem={addItem} />
                <GridList cols={5} cellHeight={100} spacing={10} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={5} style={{ height: 'auto' }}>
                        <ListSubheader color={'#282c34'} component="div">December</ListSubheader>
                    </GridListTile>
                    {fileList.map((file) => (
                        <GridListTile key={file.img}>
                            <img src={`${URL}/download/thumbnail/${file.fileId}`} alt={file.title} />
                            <GridListTileBar
                                title="deneme"
                                subtitle={<span>by: {"Mert"}</span>}
                                actionIcon={
                                    <IconButton aria-label={`info about ${"deneme"}`} className={classes.icon}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

export default GalleryContentList;