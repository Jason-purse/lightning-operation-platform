package com.generatera.operation.platform.model.params.authority;


import com.jianyue.lightning.boot.starter.generic.crud.service.annotations.ParamStrategy;
import lombok.Data;

/**
 * 前端根据给定策略Key 查询具体实现param,这个默认策略identifier 是 default
 */
@Data
@ParamStrategy
public class GenericAuthorityModuleParam implements AuthorityParam {

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
