import ReviewCard from "../components/ReviewCard";
import { reviews } from "../constants";
const CustomerReviews = () => {
  return (
    <section className="max-container">
      <h3 className="font-palanquin font-bold text-4xl text-center">
        What Our <span className="text-coral-red">Customers</span> Say?
      </h3>
      <p className="text-center m-auto mt-4 max-w-lg info-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eius
        suscipit quod dicta nemo reiciendis, esse assumenda vitae cum dolorum
        culpa asperiores numquam quidem maiores alias ab sunt libero nesciunt.
      </p>

      <div className="mt-24 flex flex-1 justify-evenly items-center gap-14 max-lg:flex-col">
        {reviews.map((review) => (
          <ReviewCard
            key={review.customerName}
            imgURL={review.imgURL}
            customerName={review.customerName}
            rating={review.rating}
            feedback={review.feedback}
          />
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
