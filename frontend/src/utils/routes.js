let HOST;
if (process.env.NODE_ENV === 'production') {
    HOST = 'https://mern-12-chatting-feature.herokuapp.com'
} else {
    HOST = 'http://localhost:5000'
}

export default HOST