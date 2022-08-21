import React from 'react'

const NewsItems = (props) => {
        let {title, description, imgUrl, newsUrl, author, date, source} = props;
        return (
            <div className="my-3">
                <div className="card">
                    <span className='position-absolute top-0 start-50 translate-middle badge rounded-pill bg-success ' style={{zIndex:'1'}}>{source}</span>
                    <img src={imgUrl?imgUrl:"https://images.moneycontrol.com/static-mcnews/2021/08/Investment.jpg"} className="card-img-top" alt="..." style={{height: '250px', objectFit:'cover'}}/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className='card-text'> <small className='text-success' style={{fontSize:'0.8rem'}}>By {!author?"Unknown":author} on {new Date(date).toDateString()} {new Date(date).toLocaleTimeString()} </small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItems
