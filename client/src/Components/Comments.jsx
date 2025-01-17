import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';

const Comments = ({ campaignId }) => {
  const user_id = localStorage.getItem('user_id');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:3000/getCommentsByCampaignId/${campaignId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Unable to fetch comments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentData = {
      name: 'Your Name',
      profile: 'YourProfilePicURL', 
      content: newComment,
    };

    setComments([newCommentData, ...comments]);
    setNewComment('');
    setSubmitLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/addComment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId, comment: newComment, userId: user_id }),
      });
      if (!response.ok) {
        throw new Error('Error adding comment');
      }
      fetchComments();
    } catch (error) {
      console.error('Error:', error);
      setError('Unable to post your comment. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="mt-4 w-full p-4 bg-gray-800 rounded-lg">
      <h3 className="text-lg font-bold mb-4 text-white">Comments</h3>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment, index) => (
            <li key={index} className="flex items-start space-x-4 p-3 rounded-lg">
              <Avatar
                name={comment.name}
                src={comment.profile}
                round={true}
                size="40"
                alt={`${comment.name}'s profile picture`}
              />
              <div>
                <p className="text-white font-bold">{comment.name}</p>
                <p className="text-gray-300">{comment.content}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300">No comments yet. Be the first to comment!</p>
      )}
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <input
          type="text"
          className="w-1/2 p-2 bg-gray-600 text-gray-100 rounded"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={submitLoading}
        />
        <button
          type="submit"
          className="ml-4 mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          disabled={submitLoading}
        >
          {submitLoading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
};

export default Comments;
