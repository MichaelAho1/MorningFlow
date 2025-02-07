import styles from './newsCard.module.css';
import React, { useEffect, useState } from "react";

export default function NewsCard() {
    const [news, setNews] = useState([]);

    async function getNews() {
        const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=f6b1c5e7b71846ae902c483a30fe8885");
        const data = await response.json();
        setNews(data.articles.slice(1, 7)); 
    }

    useEffect(() => {
        getNews();
    }, []);

    return (
        <div className={styles.card}>
            <h1 className={styles.header}>News for {new Date().toLocaleDateString('en-US', { weekday: 'long' })}</h1>
            <div className={styles.newsGrid}>
                {news.map((article, index) => (
                    <div key={index} className={styles.newsItem}>
                        <h2>{article.title}</h2>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
                        {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
                    </div>
                ))}
            </div>
        </div>
    );
}