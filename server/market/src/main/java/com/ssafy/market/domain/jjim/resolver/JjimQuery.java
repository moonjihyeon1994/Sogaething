package com.ssafy.market.domain.jjim.resolver;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.ssafy.market.domain.file.repository.FileRepository;
import com.ssafy.market.domain.hashtag.repository.HashtagRepository;
import com.ssafy.market.domain.jjim.domain.Jjim;
import com.ssafy.market.domain.jjim.repository.JjimRepository;
import com.ssafy.market.domain.post.domain.Post;
import com.ssafy.market.domain.post.dto.PostMetaOutput;
import com.ssafy.market.domain.post.repository.PostRepository;
import com.ssafy.market.domain.product.domain.Product;
import com.ssafy.market.domain.product.repository.ProductRepository;
import com.ssafy.market.domain.user.repository.UserRepository;
import com.ssafy.market.domain.user.security.TokenProvider;
import graphql.schema.DataFetchingEnvironment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JjimQuery implements GraphQLQueryResolver {

    private final JjimRepository jjimRepository;
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final ProductRepository productRepository;
    private final FileRepository fileRepository;
    private final HashtagRepository hashtagRepository;

    @Transactional
    public List<PostMetaOutput> findJjimByUserId(DataFetchingEnvironment env) {
        Long userId = tokenProvider.getUserIdFromHeader(env);
        List<Jjim> jjims = jjimRepository.findByUserIdOrderByCreatedDateDesc(userId);

        List<Long> postIds = new ArrayList<>();
        for (int i = 0; i < jjims.size(); i++) {
            if (!postIds.contains(jjims.get(i).getPostId())) {
                postIds.add(jjims.get(i).getPostId());
            }
        }
        List<PostMetaOutput> userJjimResponse = new ArrayList<>();

        for (int i = 0; i < postIds.size(); i++) {
            Long postId = postIds.get(i);
            Post post = postRepository.findByPostId(postId);
            if (userId == post.getUserId()) continue;

            Product product = productRepository.findByPost(post);
            PostMetaOutput response = PostMetaOutput.builder()
                    .postId(post.getPostId())
                    .title(post.getTitle())
                    .category(product.getCategory())
                    .imgPath(fileRepository.findTop1ByProduct(product).getImgPath())
                    .price(product.getPrice())
                    .hashtag(hashtagRepository.findHashtagDistinctByProduct(product.getProductId()))
                    .isBuy(post.isBuy())
                    .viewCount(post.getViewCount())
                    .deal(post.getDeal())
                    .dealState(post.getDealState())
                    .saleDate(post.getSaleDate().toString())
                    .transaction(post.getTransaction())
                    .createdDate(post.getCreatedDate().toString())
                    .modifiedDate(post.getModifiedDate().toString())
                    .build();
            userJjimResponse.add(response);
//            if(userJjimResponse.size()==7) break;
        }

        return userJjimResponse;
    }
}
