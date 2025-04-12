import React, { useContext, useState, useEffect } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
    const { 
        input, 
        setInput, 
        loading, 
        onSent, 
        recentPrompt, 
        showResult, 
        resultData,
        resetChat,
        isTyping,
        setIsTyping
    } = useContext(Context);

    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSent(input);
        }
    };

    return (
        <div className='Main'>
            <div className="nav">
                <p className='name text-3xl '>Aushadhi</p>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        className="p-2 rounded-full hover:bg-opacity-80"
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    <img src={assets.user_icon} alt="" />
                </div>
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, Buddy.</span></p>
                            <p>How Can I Help You Today?</p>
                        </div>
                        <div className="cards">
                            <div className="card" onClick={() => onSent("I have a headache and fever — what could it be")}>
                                <p>I have a headache and fever — what could it be?</p>
                            </div>
                            <div className="card" onClick={() => onSent("My sore throat hasn’t gone away in 3 days, do I need to see a doctor?")}>
                                <p>My sore throat hasn’t gone away in 3 days, do I need to see a doctor?</p>
                            </div>
                            <div className="card" onClick={() => onSent("What can I take for a cold or body pain?")}>
                                <p>What can I take for a cold or body pain?</p>
                            </div>
                            <div className="card" onClick={() => onSent("I’m taking paracetamol — are there any side effects?")}>
                                <p>I’m taking paracetamol — are there any side effects?</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                            <button className="reset-btn" onClick={resetChat}>New Chat</button>
                        </div>
                        <div className="result-data">
                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <>
                                    <img src={assets.gemini_icon} alt="" />
                                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                </>
                            )}
                        </div>
                    </div>
                )}
                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                            type="text" 
                            placeholder='Enter A Prompt' 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        {input && (
                            <span className="clear-input" onClick={() => setInput("")}>×</span>
                        )}
                        <div>
                            <div className="typing-toggle" onClick={() => setIsTyping(!isTyping)}>
                                <div className={`toggle-switch ${isTyping ? 'active' : ''}`}></div>
                                <span>Typing {isTyping ? 'On' : 'Off'}</span>
                            </div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img 
                                src={assets.send_icon} 
                                alt="" 
                                onClick={() => onSent(input)}
                            />
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Gemini may display inaccurate information. Please verify with a reliable source before making any decisions.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main
