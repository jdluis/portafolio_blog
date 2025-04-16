import { commentType } from "../services/dto";

export const CommentsList = ({ comments }: { comments: commentType[] }) => {
  return (
    <>
      <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8"> 
      Comments:</h3>
      {comments.map(
        (comment: { postedBy: string; text: string; id: string }, index) => (
          <div
            key={index}
            className="border-b-2 border-gray-200 mb-4 pb-4"
          >
            <h4 className="text-lg font-semibold text-gray-800">
              {comment.postedBy}
            </h4>
            <p className="text-gray-700 text-base font-light mt-2 mb-4">
              {comment.text}
            </p>
          </div>
        )
      )}
    </>
  );
};

export default CommentsList;
