"use client"
import React, { useState, useEffect } from 'react';

function LikeButton() {
    //使用useState初始化发生在首次渲染之前，保证likes在渲染前就有值
    const storedLikes:any = localStorage.getItem('likes');
    const initstate=JSON.parse(storedLikes)
    const [likes, setLikes] = useState<any>(initstate);

    // 更新localStorage当点赞数改变
    useEffect(() => {
        localStorage.setItem('likes', JSON.stringify(likes));
    }, [likes]);
    function handleLikeClick() {
        setLikes((c: number)=>c+1);
  
    }
    return (
       
        <button onClick={handleLikeClick} className='LikeButton' style={{borderWidth:'1px', width:'50px', height:'40px',borderRadius:'calc(var(--radius) - 2px)' }}>
            👍 {likes}
        </button>
    );
}

export default LikeButton;