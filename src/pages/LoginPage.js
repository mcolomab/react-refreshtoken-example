import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../providers/authProvider"
import { getAllPosts } from "../utils/api/posts";

export default function LoginPage() {
    const {user, login} = React.useContext(AuthContext);
    const [posts, setPosts] = React.useState([]);

    const handleLogin = () => {
        login({username: 'manuelito'});
    }

    const handleGetPosts = async () => {
        try {
            const data = await getAllPosts();
            setPosts(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getPosts = !user ? null : <Button variant="warning" onClick={handleGetPosts}>Get Posts</Button>

    const sectionPosts = posts.length === 0 ? null : <ul>{posts.map(post => <li key={post.id}>{post.title}</li>)}</ul>

    return (
        <Container>
            <Row>
                <Col>
                <Button variant="primary" onClick={handleLogin}>Login</Button>
                {getPosts}
                </Col>
                <Col>
                    {sectionPosts}
                </Col>
            </Row>
        </Container>
    );
}