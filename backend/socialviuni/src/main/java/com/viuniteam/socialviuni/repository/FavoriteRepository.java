package com.viuniteam.socialviuni.repository;

import com.viuniteam.socialviuni.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite,Long> {
    List<Favorite> findAllByIdIn(List<Long> ids);
    List<Favorite> findAll();
    Favorite findOneById(Long id);
}
