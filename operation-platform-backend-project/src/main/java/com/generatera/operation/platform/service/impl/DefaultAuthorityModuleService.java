package com.generatera.operation.platform.service.impl;

import com.generatera.operation.platform.model.entity.AuthorityModuleEntity;
import com.generatera.operation.platform.model.params.authority.AuthorityParam;
import com.generatera.operation.platform.model.params.authority.GenericAuthorityModuleParam;
import com.generatera.operation.platform.service.AuthorityModuleService;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.converters.strategy.DefaultJpaValidationSupportForQueryAdapter;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.query.QuerySupport;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.query.jpa.DefaultJpaQuery;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.query.jpa.JpaIdQuery;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.query.jpa.JpaQueryInfo;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.query.jpa.JpaSpecificationQuery;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.service.AbstractCrudService;
import com.jianyue.lightning.boot.starter.util.EscapeUtil;
import com.jianyue.lightning.boot.starter.util.OptionalFlux;
import com.jianyue.lightning.boot.starter.util.lambda.LambdaUtils;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.lang.reflect.Type;

/**
 * @author FLJ
 * @date 2023/3/27
 * @time 17:47
 * @Description 默认的 authority module service
 */
@Service
@RequiredArgsConstructor
public class DefaultAuthorityModuleService extends AbstractCrudService<AuthorityParam, AuthorityModuleEntity> implements AuthorityModuleService {

    {
        addQueryConverters(new DefaultAuthorityQueryHandler());
    }

}
/**
 * app query handler ..
 */
class DefaultAuthorityQueryHandler implements  DefaultJpaValidationSupportForQueryAdapter<AuthorityParam> {

    @Override
    public QuerySupport addGroupHandle(AuthorityParam authorityParam) {

        // 由于这里是新增,所以进行模块名标识符匹配 ..
        // 模块名和模块标识符形成唯一约束 ..
        // 并且根据appId 来进行判断 ..

        return OptionalFlux.of(authorityParam)
                .cast(GenericAuthorityModuleParam.class)
                .map(param -> {
                    return new DefaultJpaQuery(
                            new JpaQueryInfo<>(
                                    AuthorityModuleEntity.builder()
                                            .appId(authorityParam.getId())
                                            .module_identifier(param.getModule_identifier())
                                            .moduleName(param.getModuleName().trim())
                                            .build()
                            )
                    );
                })
                .getResult();
    }

    @Override
    public QuerySupport selectListGroupHandle(AuthorityParam authorityParam) {

        // 组合了id 查询 以及 (根据模块名 / 或者模块描述查询)

        return OptionalFlux.of(authorityParam)
                .cast(GenericAuthorityModuleParam.class)
                .flattenMap(ele -> {
                    return OptionalFlux.string(authorityParam.getId())
                            .map(JpaIdQuery::new)
                            // 让它们使用相同的类型 ..
                            .cast(QuerySupport.class)
                            .orElse(() -> {
                                // 形成specification
                                return new JpaSpecificationQuery<>(new JpaQueryInfo<>(new SelectListSpecification(ele)));
                            });
                })
                .getResult();
    }

    // 给出一个sourceClass .. 用于比较传入的Param到底是否为这个类的子类 ..
    public Type getSourceClass() {
        return GenericAuthorityModuleParam.class;
    }

    @AllArgsConstructor
    static class SelectListSpecification implements Specification<AuthorityModuleEntity> {
        private GenericAuthorityModuleParam param;

        @Override
        public Predicate toPredicate(@NotNull Root<AuthorityModuleEntity> root, @NotNull CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
            // 查询一个详细信息 ...
            return OptionalFlux.string(param.getModuleName())
                    .map(moduleName -> criteriaBuilder.like(root.get(LambdaUtils.getPropertyNameForLambda(AuthorityModuleEntity::getModuleName)),
                            '%' + EscapeUtil.escapeExprSpecialWord(moduleName) + "%"))
                    .combine(
                            OptionalFlux.string(param.getDescription())
                                    .map(description -> criteriaBuilder.like(
                                            root.get(LambdaUtils.getPropertyNameForLambda(AuthorityModuleEntity::getDescription)),
                                            "%" + EscapeUtil.escapeExprSpecialWord(description) + "%"
                                    )),
                            criteriaBuilder::and
                    )
                    .getResult();
        }
    }
}



