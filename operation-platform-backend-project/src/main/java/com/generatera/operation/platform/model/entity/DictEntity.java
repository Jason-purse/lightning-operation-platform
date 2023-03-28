package com.generatera.operation.platform.model.entity;

import com.jianyue.lightning.boot.starter.generic.crud.service.entity.JpaBaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "dict_list")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class DictEntity extends JpaBaseEntity<String> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY,generator = "jpa-uuid")
    private String id;


    @Column(name = "item_type")
    private String itemType;

    @Column(name = "item_value")
    private String itemValue;

    /**
     * 直接根据唯一标识符进行数据查询,简单高效 ..
     */
    @Column(name = "fid_item_type")
    private String fidItemType;

}
