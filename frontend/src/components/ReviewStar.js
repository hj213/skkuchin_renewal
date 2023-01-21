import { useState } from "react"; ;
import { useSelector } from "react-redux";

import emptyStar from '../image/Star border-1.png';
import filledStar from '../image/Star-1.png';
import character from '../image/character.png';

import Image from 'next/image';

const ReviewStar = () => {
  const [rating, setRating] = useState(0);

  const handleTouch = (index) => {
    // setRating(index);
    if (index + 1 === rating) {
      setRating(0);
    } else {
      setRating(index + 1);
    }
  };

  const user = useSelector(state => state.auth.user);

  return (
    <div style={{ textAlign: "center" }}>
      <Image width={50} height={50} src={character}></Image>
      <p> {user !== null && user.nickname} 님 후기를 남겨주세요</p>
      <div>
      {[1, 2, 3, 4, 5].map((item, index) => {
        let starImage = emptyStar;
        if (index + 1 <= rating) {
          starImage = filledStar;
        }
        return (
            <Image key={index} width={30} height={30} src={starImage} onTouchStart={() => handleTouch(index)} alt='star' />
        );
      })}
      </div>
      <div>{`${rating} / 5`}</div>
    </div>
  );
}

export default ReviewStar;