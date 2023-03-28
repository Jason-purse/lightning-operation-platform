package com.generatera.operation.platform.model.params.app;

import com.jianyue.lightning.boot.starter.generic.crud.service.annotations.ParamStrategy;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.converters.strategy.ADD;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.converters.strategy.DELETE;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.converters.strategy.DELETE_BY_ID;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.converters.strategy.UPDATE;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
 * appParam的默认参数 ..
 */
@ParamStrategy
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GenericAppParam  implements AppParam {

    @NotBlank(message = "id must not be null",groups = {UPDATE.class, DELETE.class, DELETE_BY_ID.class})
    private String id;

    /**
     * 应用名称
     */
    @NotBlank(message = "app name must not be null",groups = {ADD.class})
    private String appName;

    /**
     * 中央授权服务器的原始 app(oauth2)
     */
    private String originAppId;

    /**
     * 应用描述
     */
    private String description;

    /**
     * 应用类型
     */
    @NotBlank(message = "app name must not be null",groups = {ADD.class})
    private String type;

    /**
     * 应用地址
     */
    private String url;
}
