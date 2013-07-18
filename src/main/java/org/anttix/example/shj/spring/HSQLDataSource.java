package org.anttix.example.shj.spring;

import java.util.Properties;

import javax.sql.DataSource;

import org.hibernate.cfg.AvailableSettings;
import org.hibernate.dialect.HSQLDialect;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

@Configuration
@Profile("dev")
// See: http://java.dzone.com/articles/spring-31-environment-profiles
public class HSQLDataSource {
	@Bean
	public DataSource dataSource() {
		return new EmbeddedDatabaseBuilder()
					.setType(EmbeddedDatabaseType.HSQL)
					.build();
	}

	@Bean(name = "hibernateProperties")
	public Properties hibernateProperties() {
		return new Properties() {
			private static final long serialVersionUID = 1779427567126967954L;
			{
				setProperty(AvailableSettings.DIALECT, HSQLDialect.class.getName());
				setProperty(AvailableSettings.HBM2DDL_AUTO, "create-drop");
				setProperty(AvailableSettings.SHOW_SQL, "true");
				setProperty(AvailableSettings.USE_SQL_COMMENTS, "true");
				//setProperty(AvailableSettings.HBM2DDL_IMPORT_FILES, "/test-data.sql");
			}
		};
	}
}
