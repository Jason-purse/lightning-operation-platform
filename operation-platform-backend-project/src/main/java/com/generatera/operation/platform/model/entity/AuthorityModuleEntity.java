package com.generatera.operation.platform.model.entity;

import com.jianyue.lightning.boot.starter.generic.crud.service.entity.JpaBaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author FLJ
 * @date 2023/3/27
 * @time 17:22
 * @Description 组织
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthorityModuleEntity extends JpaBaseEntity<String> {

    private String id;


    private String moduleName;

    /**
     * 所属应用
     */
    private String appId;

    /**
     * 模块描述
     */
    private String description;

    /**
     * 模块唯一标识
     */
    private String module_identifier;

}
