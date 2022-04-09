const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
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

const favouriteBlog = (blogs) => {
    let favourite = {}
    if (blogs.length === 0){
        return favourite
    }
    if (blogs.length >= 1){
        blogs.forEach((blog => {
            let favouriteBlog = blogs[0]
            if (blog.likes > blogs[0].likes){
                favouriteBlog = blog
            }
            favourite = favouriteBlog
        }))
    }
    console.log(favourite)
    return favourite
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}