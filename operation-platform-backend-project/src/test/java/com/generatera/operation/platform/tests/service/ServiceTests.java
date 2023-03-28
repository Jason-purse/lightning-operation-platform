package com.generatera.operation.platform.tests.service;

import com.generatera.operation.platform.model.params.app.GenericAppParam;
import com.generatera.operation.platform.model.params.authority.GenericAuthorityModuleParam;
import com.generatera.operation.platform.service.AppService;
import com.generatera.operation.platform.service.AuthorityModuleService;
import com.generatera.operation.platform.service.impl.DefaultAppService;
import com.generatera.operation.platform.service.impl.DefaultAuthorityModuleService;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.converters.strategy.StrategyGroupSupport;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.db.JpaDbTemplate;
import com.jianyue.lightning.boot.starter.util.dataflow.impl.InputContext;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

@SpringJUnitConfig
public class ServiceTests {

    @Configuration
    public static class Config {

        @Bean
        AppService appService() {
            return new DefaultAppService();
        }

        @Bean
        JpaDbTemplate jpaDbTemplate() {
            return Mockito.mock(JpaDbTemplate.class);
        }

        @Bean
        AuthorityModuleService authorityModuleService() {
            return new DefaultAuthorityModuleService();
        }
    }

    @Autowired
    private AppService appService;

    @Autowired
    private AuthorityModuleService authorityModuleService;

    @Test
    public void test() {
        // ok
        StrategyGroupSupport.Companion.invokeForAdd(() -> {
            return appService.addOperation(InputContext.of(
                    new GenericAppParam(null, "app1", "", "", "web", "https://www.baidu.com")
            ));
        });

        StrategyGroupSupport.Companion.invokeForAdd(() -> {
            return authorityModuleService.addOperation(
                    InputContext.of(
                            new GenericAuthorityModuleParam(
                                    "","user-center","","","lightning-fire-app-platform"
                            )
                    )
            );
        });
    }
}
