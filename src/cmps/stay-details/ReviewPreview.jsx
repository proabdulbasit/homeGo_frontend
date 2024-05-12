import { utilService } from '../../services/util-service.js'

export function ReviewPreview({ review }) {
    return (
        <section className="review-preview">
            <div className="review-header">
                <img src={review.user.imgUrl} alt="user" />
                <div>
                    <h3>{review.user.fullname}</h3>
                    <h4>{utilService.getTimeFormat(review.user.time)}</h4>
                </div>
            </div>
            <div className="review-body">
                <h2>{review.txt}</h2>
            </div>
        </section>
    )
}