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

import Issue1TitlePng from './Posters/Issue1-Title.png'

import { ReactComponent as FireIconSvg } from './Icons/FireSvgIcon.svg';
import { ReactComponent as OwlIconSvg } from './Icons/OwlSvgIcon.svg';
import Para from "./Para";
const FireIcon = (size=20,color='#555') => (<FireIconSvg style={{width: size,height:size,fill:color,strokeWidth:'1px',stroke:color }} />);
const OwlIcon = (size=20,color='#000') => (<OwlIconSvg style={{width: size,height:size,fill:color,strokeWidth:'1px',stroke:color }} />);


require('typeface-roboto')
require('es6-promise').polyfill();
require('isomorphic-fetch');

function App() {

    const [systemTheme, setSystemTheme] = useState(ThemeStore.getSystemTheme());
    const onThemeChanged = newTheme => {
        const color = newTheme === "light" ? "DarkGreen" : "LightGreen";
        console.log(`%c SYSTEM THEME CHANGED: ${newTheme}`, `color: ${color}`);
        setSystemTheme(newTheme);
    }

    const theme = React.useMemo(() =>
          createTheme({
            palette: {
              type: systemTheme === "dark" ? 'dark' : 'light',
            },
          }),
        [systemTheme],
    );

    
    useEffect(() => {
        ThemeStore.on(onThemeChanged);
        return () => ThemeStore.off(onThemeChanged);
    });
    
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            padding: theme.spacing(1),
            "& > *": {
                borderZZZZ: "1px solid red"
            },
        },
        separator: {
            fontSize: 1,
            height: 2,
            margin: 0,
            padding: 0
        },
        title: {
            fontSize: 20,
            margin: 0,
            padding: 0,
            lineHeight: "18px"
        },
        paragraph: {
            padding: "12px 24px 20px 24px",
            "& > p": {
                paddingTop: 8,
                paddingBottom: 0,
            }
        },
        
    }));
    
    const classes = useStyles();
    
    const features = [
        "Prevent performance degradation on a release.",
        "Get whole picture of the performance of your application components, including user actions, web api endpoints, background tasks, queue workers, and test cases.",
        "Detailed workload and metrics sliced by user actions, web api endpoints, background tasks, queue workers, and test cases.",
        "Debuggable SQL Server underlying level interop.",
        "Bottleneck visualization, including application side and SQL Server side.",
        "Anti-patterns visualization, such as excessive I/O and Select N+1.",
        "Bugs visualization in parameters' propagation."
    ];
    
    const nbsp = String.fromCharCode(160);
    const systemRequirement = [
        `Your App Components: .NET Core 1.0${nbsp}…${nbsp}8.0+, .NET Framework 3.5${nbsp}…${nbsp}4.8+.`,
        `Your SQL Server Versions: SQL Server 2008${nbsp}…${nbsp}2022+ including SQL Server LocalDB.`,
        "Dashboard API: Windows, Linux or MacOS as container or SystemD or Windows Service. IIS is also supported.",
        "Full support of both Intel and ARM platforms for Your application components and Dashboard as well as Dashboard",
        "Live Updates on Dashboard UI requires modern browser running on relatively fast CPU (i7 4770 and i3 10100 are ok, but Atom or AMD FX are not).",
    ];


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position="static" className={classes.root}>
                <Container maxWidth="md">
                <Toolbar style={{paddingLeft:0, marginLeft:0}}>
                <img src="/mstile-150x150.png" style={{width:56, height: 56, paddingTop:8, paddingLeft: 8}} />
                <div>    
                <Typography variant="body1" className={classes.title} style={{paddingLeft: 8, lineHeight: "22px"}}>
                    SQL Server Sixth Sense Dashboard
                    <div className={classes.separator} />
                    <small style={{fontWeight: "normal", opacity: "70%", lineHeight: "18px"}}>
                        Your sixth sense in developent, testing, and maintenance
                    </small>
                </Typography>
                </div>
                </Toolbar>
                </Container>
            </AppBar>
            
            <Para header={(<>{FireIcon()} Features</>)} list={features} />
            
            <br/>

            <Container maxWidth="md" >
                <br/>
                <Paper elevation={3} >
                    <Typography variant="h5" className={classes.paragraph}>
                        ❋ Highlight: Root Categories are application componenets
                    </Typography>
                    <video controls width="100%" loop muted>
                        <source src="https://github.com/devizer/devizer.github.io/releases/download/video%2FApplicationComponents/ApplicationComponents.mp4" />
                    </video>
                </Paper>
            </Container>

            <br/>

            <Container maxWidth="md" >
                <br/>
                <Paper elevation={3} >
                    <Typography variant="h5" className={classes.paragraph}>
                        ❋ Demo 2: Drilldown into performance issue
                    </Typography>
                    <video controls width="100%" loop muted poster={Issue1TitlePng}>
                        <source src="https://github.com/devizer/devizer.github.io/releases/download/video%2FPerformance-Issue-1/Performance-Issue-1.mp4" />
                    </video>
                </Paper>
            </Container>

            <br/>
            
            <Para header={(<>{OwlIcon()} System Requirements</>)} list={systemRequirement} />
            
            <br/>


        </ThemeProvider>
    );
}

export default App;
