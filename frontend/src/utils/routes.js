let HOST;
if (process.env.NODE_ENV === 'production') {
    HOST = 'http://...'
} else {
    HOST = 'http://localhost:5000'
}

export default HOST