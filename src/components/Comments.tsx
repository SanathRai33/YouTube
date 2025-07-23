import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  _id: string;
  videoId: string;
  userId: string;
  commentBody: string;
  username: string;
  commentedon: string;
}

function Comments({ videoId }: any) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCommentsId, setEditingCommentsId] = useState<string | null>(
    null
  );
  const [editText, setEditText] = useState("");

  // Simulating user data
  const user: any = {
    id: "12345",
    name: "John Doe",
    image:
      "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
  };

  // Simulated comments data
  const fetchComments = [
    {
      _id: "1",
      videoId: videoId,
      userId: "123",
      commentBody: "Great video!",
      username: "User1",
      commentedon: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      _id: "2",
      videoId: videoId,
      userId: "456",
      commentBody: "Very informative, thanks!",
      username: "User2",
      commentedon: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      _id: "3",
      videoId: videoId,
      userId: "789",
      commentBody: "I learned a lot from this video.",
      username: "User3",
      commentedon: new Date(Date.now() - 10800000).toISOString(),
    },
  ];

  const handleSubmitComment = async () => {
    if (!user || !newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const newCommentObj: Comment = {
        _id: Date.now().toString(),
        videoId: videoId,
        userId: user.id,
        commentBody: newComment,
        username: user.name || "Anonymous",
        commentedon: new Date().toISOString(),
      };

      setComments([newCommentObj, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (comment: Comment) => {
    setEditingCommentsId(comment._id);
    setEditText(comment.commentBody);
  };

  const handleUploadComment = () => {
    if (!editText.trim()) return;

    setComments((prev) =>
      prev.map((c) =>
        c._id === editingCommentsId ? { ...c, commentBody: editText } : c
      )
    );
    setEditingCommentsId(null);
    setEditText("");
  };

  // const handleDelete = () => {
  //   setComments((prev) => prev.filter((c) => c._id !== user.id));
  // };

  const handleDelete = (commentId: string) => {
  setComments((prev) => prev.filter((c) => c._id !== commentId));
};


  useEffect(() => {
    loadComponents();
  }, [videoId]);

  const loadComponents = async () => {
    setComments(fetchComments);
  };

// ...existing code...
return (
  <div className="text-black w-full max-w-2xl mx-auto">
    <h2 className="text-lg font-semibold mb-4">{comments.length} Comments</h2>
    {user && (
      <div className="flex items-start gap-3 mb-6">
        <Avatar>
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full min-h-[48px] resize-none border rounded-md px-3 py-2 mb-2"
          />
          <div className="flex gap-2">
            <Button
              onClick={() => setNewComment("")}
              disabled={!newComment.trim()}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitComment}
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={!newComment.trim()}
            >
              Comment
            </Button>
          </div>
        </div>
      </div>
    )}
    <div className="space-y-6">
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 shadow-sm"
        >
          <Avatar>
            <AvatarFallback>{comment.username[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">{comment.username}</span>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(comment.commentedon))} ago
              </span>
            </div>
            {editingCommentsId === comment._id ? (
              <div>
                <Textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full min-h-[40px] border rounded-md px-2 py-1 mb-2"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleUploadComment}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingCommentsId(null);
                      setEditText("");
                    }}
                    className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <p className="mb-2">{comment.commentBody}</p>
                {comment.userId === user.id && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(comment)}
                      className="bg-transperant text-black hover:bg-gray-100 shadow-none"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(comment._id)}
                      className="bg-transperant text-black hover:bg-gray-100 shadow-none"
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
// ...existing code...
}

export default Comments;
