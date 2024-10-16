import 'babel-polyfill';
import './App.css';
import {useEffect, useState} from "react";
import ThemeStore from "./stores/ThemeStore";

import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Container, makeStyles, Paper, Toolbar, Typography} from "@material-ui/core";

import AppBar from '@material-ui/core/AppBar';

import { ReactComponent as FireIconSvg } from './Icons/FireSvgIcon.svg';
const FireIcon = (size=20,color='#555') => (<FireIconSvg style={{width: size,height:size,fill:color,strokeWidth:'1px',stroke:color }} />);

export default function Para({header, list, bulletChar = "✓"}) {

    const useStyles = makeStyles((theme) => ({
        paragraph: {
            padding: "12px 24px 20px 24px",
            "& > p": {
                paddingTop: 8,
                paddingBottom: 0,
            }
        }

    }));
    const classes = useStyles();

    return (
        <Container maxWidth="md">
            <br/>
            <Paper elevation={3} className={classes.paragraph}>
                <Typography variant="h5">
                    {header}
                </Typography>
                {list.map(onePoint => (
                    <Typography variant="body1">
                        {bulletChar} {onePoint}
                    </Typography>
                ))}
            </Paper>
        </Container>

    );
}