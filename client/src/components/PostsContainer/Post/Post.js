import React,{useContext} from 'react';
import {Link} from 'react-router-dom'
import PostBar from '../../PostBar/PostBar'
import VotesContainer from '../../VotesContainer/VotesContainer'
const Post = props => {
  const { post,community,deletePostElement } = props;
  const {title,author,comments,communityName} = post
  return (
    <div  className="post">
    <VotesContainer post={post} />
    <div className="post-body">
    <div className="post-links">
    <Link to={`/community/${communityName}`} className="post-community">c/{communityName}</Link>
    <Link to={`/community/${communityName}`} className="post-author">u/{author}</Link>
    <Link  to={{pathname:`/post/${post._id}`, community}} className="post-content">
    <h3 className="post-title">{title}</h3>
    </Link>
    </div>
    <PostBar post={post}  deletePostElement={deletePostElement}  />
    </div>
    </div>
  );
};
export default Post;