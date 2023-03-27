package com.generatera.operation.platform.model.vo;

import lombok.*;

/**
 * @author FLJ
 * @date 2023/3/27
 * @time 17:35
 * @Description 简单authority module vo
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class SimpleAuthorityModuleVo extends BaseVo {

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
