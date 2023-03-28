package com.generatera.operation.platform.model.entity;

import com.jianyue.lightning.boot.starter.generic.crud.service.entity.JpaBaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * @author FLJ
 * @date 2023/3/27
 * @time 17:22
 * @Description 组织
 */
@Data
@Entity
@Table(name = "authority-module")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthorityModuleEntity extends JpaBaseEntity<String> {

    @Id
    @GeneratedValue(generator = "jpa-uuid",strategy = GenerationType.IDENTITY)
    private String id;


    @Column(name = "module_name")
    private String moduleName;

    /**
     * 所属应用
     */
    @Column(name = "app_id")
    private String appId;

    /**
     * 模块描述
     */
    private String description;

    /**
     * 模块唯一标识
     */
    @Column(name = "module_identifier")
    private String module_identifier;

}
