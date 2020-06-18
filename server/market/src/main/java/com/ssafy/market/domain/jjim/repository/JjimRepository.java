package com.ssafy.market.domain.jjim.repository;

import com.ssafy.market.domain.jjim.domain.Jjim;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JjimRepository extends JpaRepository<Jjim, Long> {
    Jjim findByJjimId(Long JjimId);
    int deleteByPostIdAndUserId(Long postId,Long userId);
    List<Jjim> findByUserIdOrderByCreatedDateDesc(Long UserId);

}
