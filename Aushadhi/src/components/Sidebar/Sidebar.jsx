import React, { useContext } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Sidebar = () => {
  const [extended, setExtended] = React.useState(false);
  const { onSent, resetChat, prevPrompts } = useContext(Context);

  const handlePromptClick = (prompt) => {
    onSent(prompt);
  };

  const handleNewChat = () => {
    resetChat();
    setExtended(false);
  };

  return (
    <div className={`Sidebar ${extended ? 'extended' : ''}`}>
      <div className="top">
        <img 
          src={assets.menu_icon} 
          className='menu' 
          onClick={() => setExtended(!extended)} 
          alt="Menu"
        />
        <div className="new-chat" onClick={handleNewChat}>
          <img src={assets.plus_icon} alt="New Chat" />
          {extended && <p>New Chat</p>}
        </div>
        {extended && prevPrompts.length > 0 && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((prompt, index) => {
              // Limit the display text to 30 characters
              const displayText = prompt.length > 30 
                ? prompt.substring(0, 30) + "..." 
                : prompt;
                
              return (
                <div 
                  className="recent-entry" 
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                >
                  <img src={assets.message_icon} alt="Message" />
                  <p>{displayText}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
