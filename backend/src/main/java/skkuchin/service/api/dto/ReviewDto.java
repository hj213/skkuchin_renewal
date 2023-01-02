package skkuchin.service.api.dto;

import lombok.Data;

@Data
public class ReviewDto {
    private long reviewId;
    //private long placeId;
    private float rate;
    private String content;
    private String image;
}
