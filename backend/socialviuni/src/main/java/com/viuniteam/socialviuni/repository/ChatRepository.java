package com.viuniteam.socialviuni.repository;

import com.viuniteam.socialviuni.entity.ChatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends JpaRepository<ChatEntity,Long> {
}
