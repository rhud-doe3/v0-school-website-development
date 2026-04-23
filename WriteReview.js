import { supabase } from './supabaseClient'
async function writeReview(reviewData) {
  const { data, error } = await supabase
    .from('reviews')
    .insert([reviewData]);

  if (error) {
    console.error('Error writing review:', error);
  } else {
    console.log('Review written successfully:', data);
  }
}
const reviewForm = document.createElement('form');
reviewForm.innerHTML = `
  <textarea id="reviewText" placeholder="Write your review here..."></textarea>
  <button type="submit">Submit Review</button>
`;

reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const reviewText = document.getElementById('reviewText').value;
  writeReview({ text: reviewText }); // Sends to Supabase
});

document.body.appendChild(reviewForm);