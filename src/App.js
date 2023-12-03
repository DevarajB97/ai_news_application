import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./components/styles.js";
import wordsToNumbers from "words-to-numbers";
 

const App = () => {
    const [activeArticle, setActiveArticle] = useState(0);
    const [newsArticles, setNewsArticles] = useState([]);
    //const [isOpen, setIsOpen] = useState(false);

    const classes = useStyles();

const alanKey = "e2aed9f0aa516c59e1523a1d21813b022e956eca572e1d8b807a3e2338fdd0dc/stage";


    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) =>{
                if (command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                  } else if (command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                  } else if (command === 'open')  {
                   const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;

                   const article = articles[parsedNumber - 1];
                   if(parsedNumber > 20){
                        alanBtn.playText('Please try agin.')
                   }else if(article){
                       window.open(article.url, '_blank');
                       alanBtn.playText('Opening...')
                   }
                }
            }
        })
    }, [])
    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://www.conversationdesigninstitute.com/assets/images/academy/POP/cover-card-EXT-Alan@2x.png"  className={classes.alanLogo} alt='alan logo' />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} /> 
        </div>
    );
}

export default App;