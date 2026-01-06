import 'babel-polyfill';
import 'core-js/actual';
import './App.css';
import './Animations.css';
import "@fontsource/roboto-slab/latin-400.css"; // Specify weight
import {useEffect, useState} from "react";
import ThemeStore from "./stores/ThemeStore";
import DocumentVisibilityStore from "./stores/DocumentVisibilityStore";
import {BuildDate} from "./BuildDate";

import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Container, makeStyles, Paper, Toolbar, Typography} from "@material-ui/core";

import AppBar from '@material-ui/core/AppBar';

// Posters for 3 Videos
import RootCategoriesTitlePng from './Posters/Title-Root-Categories.png'
import Issue1TitlePng from './Posters/Issue1-Title.png'
import Issue2TitlePng from './Posters/Title-Issue2.png'

import { ReactComponent as FireIconSvg } from './Icons/FireSvgIcon.svg';
import { ReactComponent as OwlIconSvg } from './Icons/OwlSvgIcon.svg';
import { ReactComponent as ReasonToBuyIconSvg } from './Icons/ReasonsToBuyIcon.svg';
import { ReactComponent as ShineIconSvg } from './Icons/ShineIcon.svg';
import Para from "./Para";
const FireIcon = (size= 20, color='#555') => (<FireIconSvg style={{width: size,height:size,fill:color,strokeWidth:'1px',stroke:color }} />);
const OwlIcon = (size= 20,  color='#000') => (<OwlIconSvg style={{width: size,height:size,fill:color,strokeWidth:'1px',stroke:color }} />);
const ReasonToBuyIcon = (size= 20,  color='#000') => (<ReasonToBuyIconSvg style={{width: size,height:size,fill:color,strokeWidth:'1px',stroke:color }} />);
const ShineIcon = (size= 20,  color='#000') => (<ShineIconSvg style={{width: size,height:size,fill:color,strokeWidth:'1px',stroke:color }} />);
const ShineIconAligned = (size= 20,  color='#000') => (<div style={{paddingRight:8,marginTop:4,display:'inline-block'}}>{ShineIcon(size, color)}</div>);

// require('typeface-roboto')

require('es6-promise').polyfill();
require('isomorphic-fetch');

function App() {

    DocumentVisibilityStore.on(isVisible => console.log("the app visibility changed: isVisible = " + isVisible));
    let buildDate = BuildDate?.length?.toLocaleString();
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

    const fireIconColor = systemTheme === "light" ? "#555" : "#BBB";
    const owlIconColor = systemTheme === "light" ? "#000" : "#FFF";
    const nbsp = String.fromCharCode(160);

    const features = [
        /*"Prevent performance degradation on a release.", - moved to REASONS TO BUY */
        // "Whole picture of the performance of yours application components, including user actions, web api endpoints, background tasks, queue workers, and test cases.",
        // "Detailed workload and metrics sliced by user actions, web api endpoints, background tasks, queue workers, and test cases.",
        "Debuggable SQL Server underlying level interop.",
        "Bottleneck visualization, including application side and SQL Server side.",
        "Anti-patterns visualization, such as excessive I/O and Select N+1.",
        "Bugs visualization in parameters' propagation."
    ];
    
    let reasonsToBuy = [
        "Get confidence in Performance and Scalability before deploying an update to production.",
        "Prevent performance degradation along with newly added features.",
        "Scale up hardening by the ease of identifying performance and scalability issues.",
        "Get proven implementation of strategy in quality by functional testing in a repeatable and reliable way.",
    ];

    let reasonsToBuyCustomized = reasonsToBuy.map(s => {
        return (
            <div style={{display: "flex", alignItems: 'center', paddingBottom: 0}}>
                <span style={{alignSelf: 'flex-start'}}>{ShineIconAligned(40, owlIconColor)}</span>
                <span style={{marginTop:-1}}>{s}</span>
            </div>
        );
    });


    const systemRequirement = [
        `Yours App Components: .NET Core 1.0${nbsp}…${nbsp}10.0+, .NET Framework 3.5${nbsp}…${nbsp}4.8+.`,
        `Yours SQL Server Versions: SQL Server 2008${nbsp}…${nbsp}2025 including Express Edition and LocalDB.`,
        "Full support of both Intel and ARM platforms for yours application components and Dashboard.",
        "Dashboard API: Windows, Linux, or MacOS as container or SystemD or Windows Service. IIS is also supported.",
        `Dashboard desktop for Windows: x64, arm64, and x86.`
        // `Dashboard desktop for Windows: x64, arm64, and x86 on Windows 7${nbsp}…${nbsp}11 and Server 2008${nbsp}R2${nbsp}…${nbsp}2025`
        // "Live Updates on Dashboard UI requires a modern browser running on a relatively fast CPU (i7-4770 and i3-10100 are ok, but Atom and AMD FX are not).",
    ];

    const cellsGap= 40;
    const stylesCells = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            // margin: 'auto auto auto auto',
            // width: '100%',
            gap: cellsGap,
            '& > *': {
                margin: theme.spacing(0),
                // width: theme.spacing(16),
                width: `calc(50% - ${cellsGap / 2}px)`,
                // height: theme.spacing(16), IS NOT FIXED,
            },
            '& > *:first-child': {
                // marginRight: 10
            },
            '& .Description': {
                padding: "0px 24px 20px 24px !important",
            }
            
        },
    }));

    const classesRows = stylesCells();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position="static" className={classes.root} data-builddate={BuildDate}>
                <Container maxWidth="md">
                <Toolbar style={{paddingLeft:0, marginLeft:0}}>
                <img alt='Logo' src="/mstile-150x150.png" style={{width:56, height: 56, paddingTop:8, paddingLeft: 8}} />
                <div>    
                <Typography variant="body1" className={classes.title} style={{paddingLeft: 8, lineHeight: "22px"}}>
                    SQL Sixth Sense Dashboard
                    <div className={classes.separator} />
                    <small style={{fontWeight: "normal", opacity: "70%", lineHeight: "18px"}}>
                        Yours sixth sense in developent, testing, and maintenance
                    </small>
                </Typography>
                </div>
                </Toolbar>
                </Container>
            </AppBar>

            <br/><br/>
            <Container className={classesRows.root} maxWidth="md">
                <Paper elevation={3} className={'SuperFeatureContainer'}>
                    <Typography variant="h5" className={`ParaHeader ${classes.paragraph}`}>
                        {FireIcon(20, fireIconColor)}&nbsp;&nbsp;The Killer Feature
                    </Typography>
                    <Typography variant="body1" className='Description'>
                        Whole picture of the performance of yours application components, including user actions, web api endpoints, background tasks, queue workers, and test cases.
                    </Typography>
                </Paper>
                <Paper elevation={3} className={'SuperFeatureContainer'}>
                    <Typography variant="h5" className={`ParaHeader ${classes.paragraph}`}>
                        {FireIcon(20, fireIconColor)}&nbsp;&nbsp;The Bombastic Feature
                    </Typography>
                    <Typography variant="body1" className='Description'>
                        Detailed SQL workload traces and metrics sliced by user actions, web api endpoints, background tasks, queue workers, and test cases.
                    </Typography>
                </Paper>
            </Container>
            <br/>

            <Para itemPaddingTopFirst={20}
                  header={(<>❋&nbsp;&nbsp;Features</>)}
                  list={features}
                  bulletChar={<>•&nbsp;</>}
            />
            <br/>

            {/* PaperContainer - animation on hover */}
            <Container maxWidth="md" className={`PaperContainer`}>
                <br/>
                <Paper elevation={3} >
                    <Typography variant="h5" className={`ParaHeader ${classes.paragraph}`}>
                        ❋&nbsp;&nbsp;Highlight: Root Categories are the application components
                    </Typography>
                    <video controls width="100%" loop muted poster={RootCategoriesTitlePng}>
                        <source src="https://github.com/devizer/devizer.github.io/releases/download/video%2FApplicationComponents/ApplicationComponents.mp4" />
                    </video>
                </Paper>
            </Container>

            <br/>

            {/* PaperContainer - animation on hover */}
            <Container maxWidth="md" className={`PaperContainer`}>
                <br/>
                <Paper elevation={3} >
                    <Typography variant="h5" className={`ParaHeader ${classes.paragraph}`}>
                        ❋&nbsp;&nbsp;Demo 2: Drill down into a performance issue
                    </Typography>
                    <video controls poster={Issue1TitlePng} width="100%" loop muted>
                        <source src="https://github.com/devizer/devizer.github.io/releases/download/video%2FPerformance-Issue-1/Performance-Issue-1.mp4" />
                    </video>
                </Paper>
            </Container>
            
            <br/>

            {/* PaperContainer - animation on hover */}
            <Container maxWidth="md" className={`PaperContainer`}>
                <br/>
                <Paper elevation={3} >
                    <Typography variant="h5" className={`ParaHeader ${classes.paragraph}`}>
                        ❋&nbsp;&nbsp;Demo 3: Drill down into paging issue
                    </Typography>
                    <video controls width="100%" loop muted poster={Issue2TitlePng}>
                        <source src="https://github.com/devizer/devizer.github.io/releases/download/video%2FPaging-Issue-2/Paging-Issue-2.mp4" />
                    </video>
                </Paper>
            </Container>
            
            <br/>
            
{/*
            <Para itemPaddingBottom={8} itemPaddingTopFirst={12} itemPaddingTop={1}
                  header={(<>{ReasonToBuyIcon(20, owlIconColor)}&nbsp;&nbsp;4 Reasons to buy S5 Dashboard</>)}
                  bulletChar={null}
                  list={reasonsToBuy} 
            />
*/}
            <Para itemPaddingTopFirst={20}
                  header={(<>{ReasonToBuyIcon(20, owlIconColor)}&nbsp;&nbsp;4 Reasons to buy S5 Dashboard</>)}
                  bulletChar1={<span style={{fontVariantEmoji: "text"}}>&#x1F31F;&nbsp;</span>}
                  bulletChar={<span style={{fontVariantEmoji: "text"}}>✴&nbsp;</span>} /*2728*/
                  bulletChar3={<span style={{fontVariantEmoji: "text"}}>&#x2747;&nbsp;</span>}
                  
                  list={reasonsToBuy}
            />
            <br/>

            <Para itemPaddingTopFirst={20} 
                header={(<>{OwlIcon(20, owlIconColor)}&nbsp;&nbsp;Wide support of platforms and OS</>)}
                bulletChar={<>•&nbsp;</>}
                list={systemRequirement} 
            />
            <br/><br/>

        </ThemeProvider>
    );
}

export default App;
