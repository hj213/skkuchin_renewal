import { useState } from "react"; ;
import { useSelector } from "react-redux";

import emptyStar from '../image/Star_border-1.png';
import filledStar from '../image/Star-1.png';
import character from '../image/character.png';

import Image from 'next/image';
import { Typography } from "@mui/material";

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
    <div style={{ textAlign: "center", margin: '0px -20px', padding: '19px 0 12px', borderBottom: '4px solid rgba(217, 217, 217, 0.54)', borderTop: '4px solid rgba(217, 217, 217, 0.54)'}}>
      <Image width={50} height={50} src={character}></Image>
      <Typography sx={{fontSize: '17px', fontWeight: '500', color: '#000000'}}> 
        <span style={{color: '#FFCE00'}}>{user !== null && user.nickname}</span> 님 후기를 남겨주세요
        </Typography>
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
      <Typography sx={{fontSize: '18px', fontWeight: '700', color: '#FFCE00'}}>{`${rating}점`}</Typography>
    </div>
  );
}

export default ReviewStar;