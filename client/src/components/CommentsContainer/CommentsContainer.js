import React,{Suspense,lazy} from 'react'
import Loader from '../Loader'
const Comments = lazy(() => import('./Comments'));
const CommentsContainer= ({comments,toggle,on,setEditComment,setComments,getNextPage}) => {
  const deleteCommentElement = commentId => {
    const editedComments = comments.filter(
      comment => comment._id !== commentId
    );
    setComments(editedComments);
  };
    return (
        <>
        {comments ? (
          <Suspense fallback={<Loader />}>
            <div className="comments-container" >
            <Comments  
                    comments={comments}
                    deleteCommentElement={deleteCommentElement}
                    toggle={toggle}
                    setEditComment={setEditComment}
                    on={on}/>
              <button onClick={getNextPage} className="button load-more-button">
                Load More
              </button>
            </div>
          </Suspense>
        ) : (
          <h1>No Comments</h1>
        )}
        </>
    )
}
export default CommentsContainer