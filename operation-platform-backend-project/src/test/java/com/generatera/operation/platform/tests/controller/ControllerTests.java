package com.generatera.operation.platform.tests.controller;

import com.generatera.operation.platform.controller.AppController;
import com.generatera.operation.platform.controller.AuthorityController;
import com.generatera.operation.platform.model.params.app.GenericAppParam;
import com.generatera.operation.platform.service.AppService;
import com.generatera.operation.platform.service.AuthorityModuleService;
import com.generatera.operation.platform.service.impl.DefaultAppService;
import com.generatera.operation.platform.service.impl.DefaultAuthorityModuleService;
import com.jianyue.lightning.boot.autoconfigure.web.WebConfigAutoConfiguration;
import com.jianyue.lightning.boot.starter.generic.crud.service.config.CrudServiceAutoConfiguration;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.db.JpaDbTemplate;
import com.jianyue.lightning.util.JsonUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.web.SpringJUnitWebConfig;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringJUnitWebConfig
@TestPropertySource(locations = "classpath:controllers.tests/crud-config.properties")
public class ControllerTests {

    /**
     * 先导入这个依赖项 ..
     */
    public static class DbTemplateConfig {
        @Bean
        JpaDbTemplate jpaDbTemplate() {
            return Mockito.mock(JpaDbTemplate.class);
        }
    }


        // 我们通过 WebMvcAutoConfiguration 来重写了 EnableWebMvc的逻辑

        @Configuration
        @Import({WebConfigAutoConfiguration.class,DbTemplateConfig.class,CrudServiceAutoConfiguration.class, WebMvcAutoConfiguration.class})
        public static class Config {

            @Bean
            public AppController appController() {
                return new AppController(appService());
            }

            @Bean
            public AuthorityController authorityController() {
                return new AuthorityController(authorityModuleService());
            }

            @Bean
            AppService appService() {
                return new DefaultAppService();
            }


            @Bean
            AuthorityModuleService authorityModuleService() {
                return new DefaultAuthorityModuleService();
            }

        }

   private MockMvc mockMvc;

    @BeforeEach
    public void eachBefore(WebApplicationContext applicationContext) {
        mockMvc = MockMvcBuilders.webAppContextSetup(applicationContext).build();
    }

    @Test
    public void test() throws Exception {
        this.mockMvc.perform(
                post("/api/admin/app/v1")
                        .content(JsonUtil.getDefaultJsonUtil().asJSON(
                                new GenericAppParam(null, "app1", "", "", "web", "https://www.baidu.com")
                        ))
        ).andDo(MockMvcResultHandlers.log());
    }
}
