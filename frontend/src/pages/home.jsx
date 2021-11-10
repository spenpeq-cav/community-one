import React from 'react'
import Projects from '../components/Projects/Projects';
import { Container } from 'react-bootstrap';

function home() {
    return (
        <div>
            <Container>
                <Projects />
            </Container>
        </div>
    )
}

export default home
