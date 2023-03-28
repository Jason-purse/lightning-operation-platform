package com.generatera.operation.platform.model.params.authority;


import com.jianyue.lightning.boot.starter.generic.crud.service.annotations.ParamStrategy;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.converters.strategy.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
 * 前端根据给定策略Key 查询具体实现param,这个默认策略identifier 是 default
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ParamStrategy
public class GenericAuthorityModuleParam implements AuthorityParam {

    @NotBlank(message = "id must not be null",groups = {UPDATE.class, DELETE.class, DELETE_BY_ID.class})
    private String id;


    @NotBlank(message = "module name must not be null",groups = {ADD.class})
    private String moduleName;

    /**
     * 所属应用
     */
    @NotBlank(message = "app id must not be null",groups = {ADD.class})
    private String appId;



    /**
     * 模块描述
     */
    private String description;

    /**
     * 模块唯一标识
     */
    @NotBlank(message = "module identifier must not be null",groups = {ADD.class})
    private String module_identifier;

}
