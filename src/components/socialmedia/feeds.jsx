import React, { useEffect, useState,memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Modal } from "react-bootstrap";
import { deletePost, fetchPosts } from "../../statemangagment/apiSlice";
import { archiveData, setData } from "../../statemangagment/postSlice";
import { defualtText } from "../../constants/constant";
import '../../styles/costume.css'

function Feeds() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.api.posts);
  const [deleteModal, setDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  useEffect(() => {
    dispatch(setData(posts))
  }, [posts])

  
  const handleDelete = (postId) => {
    setPostIdToDelete(postId);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deletePost(postIdToDelete));
    setDeleteModal(false);
  };

  const handleArchive = (postId) => {
    // Archive logic goes here
    dispatch(archiveData(postId))
    dispatch(deletePost(postId));
  };

  const handleDeliver = (postId) => {
    // Deliver logic goes here
    console.log(`Delivering post with ID: ${postId}`);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center pt-5 mt-5">
      {posts.map((post) => (
        <div key={post.id} className="w-50 py-2">
          <Card className="d-flex flex-column align-items-center">
            <Card.Img
              variant="top"
              src={post.avatar}
              alt={post.last_name}
              className="w-100 py-2"
            />
            <Card.Body className="d-flex flex-column align-items-center">
            <Card.Text className="px-5">{defualtText}</Card.Text>
              <div className="btn-group">
                <Button
                  variant="danger"
                  className="rounded"
                  onClick={() => handleDelete(post.id)}>
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleArchive(post.id)}
                  className="mx-5 rounded" // Add margin between buttons
                >
                  Archive
                </Button>
                <Button
                  variant="success"
                  className="rounded"
                  onClick={() => handleDeliver(post.id)}>
                  Deliver
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
      {/* Delete Confirmation Modal */}
      <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Feeds;
