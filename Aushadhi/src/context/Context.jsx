import { createContext, useState } from "react";
import { run } from "../config/Gemini";
export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + (index === 0 ? '' : ' ') + nextWord);
        }, 75 * index);
    };

    const resetChat = () => {
        setShowResult(false);
        setResultData("");
        setRecentPrompt("");
        setInput("");
    };

    const onSent = async (prompt) => {
        if (!prompt.trim()) return;
        
        // Reset and set initial states
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(prompt);
        
        // Add to previous prompts (only once)
        setPrevPrompts(prev => {
            // Check if prompt already exists to avoid duplicates
            if (!prev.includes(prompt)) {
                return [...prev, prompt];
            }
            return prev;
        });
        
        try {
            // API call
            const result = await run(prompt);
            
            // Process the result for formatting
            let formattedResult = result;
            
            // Handle bold text with **
            let resultArray = formattedResult.split("**");
            let boldProcessed = "";
            for (let i = 0; i < resultArray.length; i++) {
                if (i % 2 === 1) {
                    // This is inside ** ** so make it bold
                    boldProcessed += "<b>" + resultArray[i] + "</b>";
                } else {
                    boldProcessed += resultArray[i];
                }
            }
            
            // Handle line breaks with *
            let finalResult = boldProcessed.split("*").join("<br>");
            
            // Set the full result immediately if not using typing animation
            if (!isTyping) {
                setResultData(finalResult);
                setLoading(false);
            } else {
                // For typing animation, keep loading until animation starts
                let words = finalResult.split(" ");
                
                // Start typing animation
                for (let i = 0; i < words.length; i++) {
                    delayPara(i, words[i]);
                    
                    // Set loading to false after a short delay to ensure smooth transition
                    if (i === 0) {
                        setTimeout(() => {
                            setLoading(false);
                        }, 500);
                    }
                }
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            setResultData("Sorry, there was an error processing your request.");
            setLoading(false);
        } finally {
            setInput("");
            // Note: We don't set loading to false here as it's handled in the try block
        }
    };

    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResult,
        loading,
        resultData,
        onSent,
        resetChat,
        isTyping,
        setIsTyping
    };
    
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;