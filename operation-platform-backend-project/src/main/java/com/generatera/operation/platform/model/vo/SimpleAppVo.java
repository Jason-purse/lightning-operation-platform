package com.generatera.operation.platform.model.vo;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class SimpleAppVo extends BaseVo {

    private String id;

    /**
     * 应用名称
     */
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
    private String type;

    /**
     * 应用地址
     */
    private String url;
}
