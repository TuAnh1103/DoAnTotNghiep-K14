        package com.viuniteam.socialviuni.entity;
        import lombok.Data;

        import javax.persistence.Entity;
        import javax.persistence.JoinColumn;
        import javax.persistence.ManyToOne;
        @Entity
        @Data
        public class Follower extends BaseEntity{
            @ManyToOne
            @JoinColumn(name = "user_id")
            private User user;
        }
