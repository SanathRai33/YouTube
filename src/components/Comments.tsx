import React, { use, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@/lib/AuthContext";
import {
  Clock,
  Edit2,
  MoreVertical,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Comment {
  _id: string;
  videoid: string;
  userid: string;
  commentbody: string;
  usercommented: string;
  commentedon: string;
}

function Comments({ videoid }: any) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCommentsId, setEditingCommentsId] = useState<string | null>(
    null
  );
  const [editText, setEditText] = useState("");

  const { user } = useUser();

  useEffect(() => {
    if (user && videoid) {
      loadComments();
    } else {
      setLoading(true);
    }
  }, [user, videoid]);

  const loadComments = async () => {
    if (!user || !videoid) return;

    try {
      const CommentData = await axiosInstance.get(`/comment/${videoid}`);
      setComments(CommentData.data);
    } catch (error) {
      console.error("Failed to load comment:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-10 text-center text-gray-500">Loading...</div>;
  }
  const handleSubmitComment = async () => {
    if (!user || !newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post(`/comment/postComment`, {
        videoid: videoid,
        userid: user._id,
        commentbody: newComment,
        usercommented: user.name,
      });
      if (res.data.comment) {
        const newCommentObj: Comment = {
          _id: Date.now().toString(),
          videoid: videoid,
          userid: user._id,
          commentbody: newComment,
          usercommented: user.name || "Anonymous",
          commentedon: new Date().toISOString(),
        };
        setComments([newCommentObj, ...comments]);
      }
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (comment: Comment) => {
    setEditingCommentsId(comment?._id);
    setEditText(comment?.commentbody);
  };

  const handleUploadComment = async () => {
    if (!editText.trim()) return;
    try {
      const res = await axiosInstance.put(
        `/comment/updateComment/${editingCommentsId}`,
        { commentbody: editText }
      );
      if (res.data.comment) {
        setComments((prev) =>
          prev.map((c) =>
            c._id === editingCommentsId ? { ...c, commentbody: editText } : c
          )
        );
        setEditingCommentsId(null);
        setEditText("");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      const res = await axiosInstance.delete(`/comment/deleteComment/${id}`);
      if (res.data.comment) {
        setComments((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (error) {
      console.log("Filed to delete comment", error);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-black">
        <Clock className="w-10 h-10 mb-2" />
        <h2 className="text-lg font-semibold mb-1">
          Keep track of what you watch
        </h2>
        <p className="text-sm">
          Watch comment is not viewable when signed out.
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className="py-10 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="text-black w-full max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">{comments.length} Comments</h2>
      {user && (
        <div className="flex items-start gap-3 mb-6">
          <Avatar>
            <AvatarImage src={user?.image} alt={user?.name} />
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              id="text"
              name="text"
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full min-h-[48px] resize-none border-0 border-black border-b-2 px-3 py-2 mb-2 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-black rounded-none focus:outline-none focus:border-transparent focus:ring-0"
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
      <div className="space-y-1">
        {comments?.length === 0 ? (
          <p>No comments yet.Be the first to comment!</p>
        ) : (
          <>
            {comments?.map((comment) => (
              <div
                key={comment?._id}
                className="flex items-start bg-gray-50 gap-1 rounded-lg p-2  pb-10"
              >
                <Avatar>
                  {user?.image ? (
                    <AvatarImage
                      src={user?.image}
                      alt={comment?.usercommented}
                    />
                  ) : (
                    <AvatarFallback className="bg-black text-white">
                      {comment?.usercommented?.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">
                      {comment?.usercommented}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(comment?.commentedon))} ago
                    </span>
                  </div>
                  {editingCommentsId === comment?._id ? (
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
                    <div className="flex justify-between items-start ">
                      <div>
                        <p className="mb-2">{comment?.commentbody}</p>
                        <div className="flex items-center gap-5 text-black">
                          <div className="flex items-center gap-1">
                            <Button className="bg-white w-10 px-0 text-black hover:bg-white flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4 cursor-pointer" />
                              <span className="text-[12px] text-gray-800">
                                {10}
                              </span>
                            </Button>
                            <Button className="bg-white w-6 px-0 text-black hover:bg-white">
                              <ThumbsDown className="w-4 h-4 cursor-pointer" />
                            </Button>
                          </div>
                          <div>
                            <span className="font-[600] cursor-pointer">
                              Reply
                            </span>
                          </div>
                        </div>
                      </div>
                      {comment?.userid === user?._id && (
                        <div className="flex gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild className="self-end">
                              <Button
                                variant="outline"
                                size="icon"
                                className="bg-white rounded-full border-0 hover:bg-gray-300 w-2 h-7"
                              >
                                <MoreVertical />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Button
                                  onClick={() => handleEdit(comment)}
                                  className="bg-transperant text-black hover:bg-gray-100 shadow-none"
                                >
                                  <Edit2 size={16} className="text-black" />
                                  Edit
                                </Button>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Button
                                  onClick={() => handleDelete(comment?._id)}
                                  className="bg-transperant text-black hover:bg-gray-100 shadow-none"
                                >
                                  <Trash2 size={16} className="text-black" />
                                  Delete
                                </Button>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Comments;
