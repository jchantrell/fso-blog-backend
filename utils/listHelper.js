const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    console.log(blogs)
    let total = 0
    if (blogs.length === 0){
        total = 0
    }
    if (blogs.length >= 1){
        blogs.forEach((blog => {
            total += blog.likes
        }))
    }
    return total

}

module.exports = {
    dummy,
    totalLikes
}