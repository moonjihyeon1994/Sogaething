package com.ssafy.market.domain.jjim.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JjimOutput {
    private Long jjimId;
    private Long postId;
    private Long userId;
    private String createdDate;
    private String modifiedDate;
}
