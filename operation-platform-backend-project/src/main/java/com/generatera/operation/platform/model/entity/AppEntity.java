package com.generatera.operation.platform.model.entity;

import com.jianyue.lightning.boot.starter.generic.crud.service.entity.JpaBaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "operation_apps")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class AppEntity extends JpaBaseEntity<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY,generator = "jpa-uuid")
    private String id;

    /**
     * 应用名称
     */
    @Column(name = "app_name")
    private String appName;

    /**
     * 中央授权服务器的原始 app(oauth2)
     */
    @Column(name = "origin_app_id")
    private String originAppId;

    /**
     * 应用描述
     */
    @Column(name = "description")
    private String description;

    /**
     * 应用类型
     */
    @Column(name = "type")
    private String type;

    /**
     * 应用地址
     */
    @Column(name = "url")
    private String url;

}
